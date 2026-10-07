import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import {
  InstructorContentPort,
  InstructorEvidence,
  InstructorEvidenceKind,
} from '../../application/ports/instructor-content.port';
import {
  InstructorIntent,
  InstructorRetrievalPlan,
  InstructorSource,
} from '../../application/instructor-ai/instructor-query';
import { InstructorProposal } from '../../application/instructor-ai/instructor-proposal';
import { PrismaInstructorProposalRepository } from './prisma-instructor-proposal.repository';
import {
  postSelect,
  courseSelect,
  loadInstructorPost,
  instructorContentSnapshot,
} from './instructor-content-snapshot';
import { ContentChunkSourceType } from '../../application/ai-chat/hybrid-content-search.types';
import { PrismaService } from '../database/prisma/prisma.service';
import { HybridContentSearchService } from './hybrid-content-search.service';
import { InstructorContentAuthorizationService } from './instructor-content-authorization.service';

/** Infrastructure adapter: database access, shared hybrid retrieval and approved writes. */
@Injectable()
export class PrismaInstructorContentRepository implements InstructorContentPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly search: HybridContentSearchService,
    private readonly authorization: InstructorContentAuthorizationService,
    private readonly proposals: PrismaInstructorProposalRepository,
  ) {}

  async listSources(
    userId: string,
    query = '',
    type?: 'COURSE' | 'POST' | 'FILE',
  ) {
    const text = query.trim().slice(0, 200);
    const [courses, posts, files] = await Promise.all([
      !type || type === 'COURSE'
        ? this.prisma.course.findMany({
            where: {
              userId,
              ...(text
                ? { title: { contains: text, mode: 'insensitive' } }
                : {}),
            },
            orderBy: [{ lastUpdated: 'desc' }, { id: 'asc' }],
            take: 30,
            select: { id: true, title: true },
          })
        : [],
      !type || type === 'POST'
        ? this.prisma.post.findMany({
            where: {
              ...this.authorization.postWhere(userId),
              ...(text
                ? { title: { contains: text, mode: 'insensitive' } }
                : {}),
            },
            orderBy: [{ lastUpdated: 'desc' }, { id: 'asc' }],
            take: 30,
            select: { id: true, title: true },
          })
        : [],
      !type || type === 'FILE'
        ? this.prisma.file.findMany({
            where: {
              userId,
              ...(text
                ? { name: { contains: text, mode: 'insensitive' } }
                : {}),
            },
            orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
            take: 30,
            select: { id: true, name: true },
          })
        : [],
    ]);
    return [
      ...courses.map((c) => ({
        sourceType: 'COURSE',
        sourceId: c.id,
        label: c.title,
      })),
      ...posts.map((p) => ({
        sourceType: 'POST',
        sourceId: p.id,
        label: p.title ?? 'Untitled post',
      })),
      ...files.map((f) => ({
        sourceType: 'FILE',
        sourceId: f.id,
        label: f.name,
      })),
    ];
  }

  async retrieve(
    userId: string,
    plan: InstructorRetrievalPlan,
    sources: readonly InstructorSource[],
  ): Promise<InstructorEvidence> {
    const { query } = plan;
    await this.authorization.assertInstructor(userId);
    // Context must remain authorized even if ownership changes after attachment.
    for (const source of sources)
      await this.authorization.assertCanAccess(userId, source.type, source.id);
    let target =
      query.targetSourceIndex === null
        ? null
        : sources[query.targetSourceIndex];
    const warnings: string[] = [];
    if (!target && query.targetName) {
      const matches = (await this.listSources(userId, query.targetName)).filter(
        (s) =>
          s.label.toLocaleLowerCase() === query.targetName!.toLocaleLowerCase(),
      );
      if (matches.length === 1)
        target = {
          type: matches[0].sourceType as InstructorSource['type'],
          id: matches[0].sourceId,
          name: matches[0].label,
          current: true,
          courseScope: null,
        };
      else
        warnings.push(
          matches.length > 1
            ? 'The resource name is ambiguous; attach the intended source.'
            : 'No owned resource matched the requested name.',
        );
    }
    if (!target && !query.targetName) {
      const current = sources.filter((s) => s.current);
      if (current.length === 1) target = current[0];
      else if (sources.length === 1) target = sources[0];
    }
    let courseId =
      target?.type === 'COURSE' ? target.id : (target?.courseScope ?? null);
    const postId = target?.type === 'POST' ? target.id : null;
    let post: Awaited<ReturnType<typeof this.loadPost>> = null;
    if (postId) {
      post = await this.loadPost(this.prisma, userId, postId);
      courseId = post?.courseId ?? null;
    }
    // A personally authored post in someone else's course does not grant course access.
    if (
      courseId &&
      !(await this.authorization.canAccess(userId, 'COURSE', courseId))
    )
      courseId = null;
    const course = courseId
      ? await this.prisma.course.findFirst({
          where: { id: courseId, userId },
          select: courseSelect,
        })
      : null;
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { creatorPrompt: true },
    });
    const sourceFileIds = sources
      .filter((s) => s.type === 'FILE')
      .map((s) => s.id);
    const evidence: InstructorEvidence = {
      items: [],
      citations: [],
      warnings,
      courseId,
      postId,
      sourceHash: await this.snapshotHash(
        this.prisma,
        userId,
        courseId,
        postId,
        sourceFileIds,
      ),
      sourceFileIds,
      creatorStyle: user?.creatorPrompt?.slice(0, 3000) ?? null,
    };
    const add = (
      authority: InstructorEvidence['items'][number]['authority'],
      label: string,
      data: unknown,
      source?: { type: string; id: string; label: string },
      kind = InstructorEvidenceKind.SELECTED_SOURCE,
    ) => {
      const ref = `R${evidence.items.length + 1}`;
      evidence.items.push({ ref, kind, authority, label, data });
      if (source)
        evidence.citations.push({
          ref,
          source,
          url: this.resourceUrl(source.type, source.id),
        });
      return ref;
    };
    if (course)
      add(
        'COURSE_OFFICIAL',
        course.title,
        course,
        { type: 'COURSE', id: course.id, label: course.title },
        InstructorEvidenceKind.COURSE_OVERVIEW,
      );
    if (post)
      add(
        'RESOURCE_SPECIFIC',
        post.title ?? 'Untitled post',
        this.safePost(post, userId),
        { type: 'POST', id: post.id, label: post.title ?? 'Untitled post' },
      );
    const fileSources = sources.filter((s) => s.type === 'FILE');
    for (const source of fileSources) {
      const file = await this.prisma.file.findFirst({
        where: { id: source.id, userId },
        select: { id: true, name: true, summary: true, aiStatus: true },
      });
      if (file)
        add('RESOURCE_SPECIFIC', file.name, file, {
          type: 'FILE',
          id: file.id,
          label: file.name,
        });
    }
    if (course && plan.inventory) {
      const posts = await this.prisma.post.findMany({
        where: { courseId: course.id },
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        take: 200,
        select: postSelect,
      });
      for (const p of posts)
        add(
          'RESOURCE_SPECIFIC',
          p.title ?? 'Untitled post',
          this.safePost(p, userId, false),
          { type: 'POST', id: p.id, label: p.title ?? 'Untitled post' },
          InstructorEvidenceKind.INVENTORY,
        );
      if (course._count.posts > posts.length)
        warnings.push(
          `Only ${posts.length} of ${course._count.posts} posts were loaded; this is a sampled review.`,
        );
      if (posts.some((p) => p.aiStatus !== 'READY'))
        warnings.push(
          'Some resources are still processing; summaries or indexed content may be unavailable.',
        );
      const fileWhere: Prisma.FileWhereInput = {
        userId,
        OR: [
          { inCourses: { some: { courseId: course.id } } },
          { inPosts: { some: { post: { is: { courseId: course.id } } } } },
        ],
      };
      const [files, totalFiles] = await Promise.all([
        this.prisma.file.findMany({
          where: fileWhere,
          orderBy: { id: 'asc' },
          take: 200,
          select: { id: true, name: true, summary: true, aiStatus: true },
        }),
        this.prisma.file.count({ where: fileWhere }),
      ]);
      for (const f of files)
        add(
          'RESOURCE_SPECIFIC',
          f.name,
          f,
          { type: 'FILE', id: f.id, label: f.name },
          InstructorEvidenceKind.INVENTORY,
        );
      if (totalFiles > files.length)
        warnings.push(
          `Only ${files.length} of ${totalFiles} owned course files were loaded.`,
        );
    }
    if (query.intent !== InstructorIntent.GENERAL) {
      const narrowTarget =
        target && target.type !== 'COURSE' && !plan.inventory;
      const selectedResources =
        narrowTarget && target
          ? [target]
          : sources.filter((s) => s.type !== 'COURSE');
      const scopedSources = selectedResources.map((s) => ({
        sourceType: s.type as ContentChunkSourceType,
        sourceId: s.id,
      }));
      const scopedCourses = narrowTarget
        ? []
        : courseId
          ? [courseId]
          : sources.filter((s) => s.type === 'COURSE').map((s) => s.id);
      const searches = [
        query.topic || query.targetName || target?.name || 'course content',
      ];
      if (course && plan.coverage) {
        const goals = [
          ...course.learningOutcomes.map((o) => o.text),
          ...course.skills.map((s) => `${s.skill.name}: ${s.outcome}`),
        ];
        searches.push(...goals.slice(0, 12));
        if (goals.length > 12)
          warnings.push(
            'Coverage retrieval was limited to the first 12 declared outcomes/skills.',
          );
      }
      for (const searchQuery of searches) {
        const chunks = await this.search.search(userId, {
          query: searchQuery,
          instructorOnly: true,
          ...(scopedCourses.length ? { courseIds: scopedCourses } : {}),
          ...(scopedSources.length ? { sources: scopedSources } : {}),
          sourceTypes: [
            ContentChunkSourceType.POST,
            ContentChunkSourceType.FILE,
          ],
          limit: searches.length > 1 ? 4 : 12,
        });
        const references: string[] = [];
        for (const c of chunks) {
          const label = await this.sourceLabel(
            userId,
            c.sourceType,
            c.sourceId,
          );
          references.push(
            add(
              'RESOURCE_SPECIFIC',
              label,
              {
                content: c.content,
                sequence: c.sequence,
                searchedFor: searchQuery,
              },
              { type: c.sourceType, id: c.sourceId, label },
              InstructorEvidenceKind.RETRIEVED_PASSAGE,
            ),
          );
        }
        add(
          'RESOURCE_SPECIFIC',
          `Retrieved support for: ${searchQuery}`,
          {
            searchedFor: searchQuery,
            references,
            supportFound: references.length > 0,
          },
          undefined,
          InstructorEvidenceKind.COVERAGE_SUPPORT,
        );
      }
    }
    if (courseId && plan.duplicateCandidates) {
      const pairs = await this.prisma.$queryRaw<
        {
          leftId: string;
          rightId: string;
          leftContent: string;
          rightContent: string;
        }[]
      >(Prisma.sql`
        WITH sample AS (
          SELECT a.* FROM "content_chunk" a
          JOIN "course" c ON c."id" = a."courseId"
          JOIN "post" pa ON pa."id" = a."sourceId" AND pa."courseId" = c."id"
          WHERE c."id" = ${courseId} AND c."userId" = ${userId} AND a."sourceType" = 'POST' AND a."embedding" IS NOT NULL
          ORDER BY a."sequence", a."sourceId" LIMIT 200
        )
        SELECT a."sourceId" AS "leftId", b."sourceId" AS "rightId", a."content" AS "leftContent", b."content" AS "rightContent"
        FROM sample a CROSS JOIN LATERAL (
          SELECT candidate."sourceId", candidate."content", candidate."embedding"
          FROM "content_chunk" candidate
          JOIN "post" pb ON pb."id" = candidate."sourceId" AND pb."courseId" = ${courseId}
          WHERE candidate."courseId" = ${courseId} AND candidate."sourceType" = 'POST' AND candidate."sourceId" > a."sourceId"
            AND candidate."embeddingModel" = a."embeddingModel" AND candidate."embedding" IS NOT NULL
          ORDER BY candidate."embedding" <=> a."embedding" LIMIT 3
        ) b WHERE (a."embedding" <=> b."embedding") < 0.15
        ORDER BY a."embedding" <=> b."embedding" LIMIT 12`);
      add(
        'RESOURCE_SPECIFIC',
        'Possible overlapping passages (not confirmed duplicates)',
        pairs,
        undefined,
        InstructorEvidenceKind.DUPLICATE_CANDIDATE,
      );
      warnings.push(
        'Duplicate detection samples up to 200 post excerpts; overlaps outside that sample may be missed.',
      );
    }
    if (plan.community && (courseId || postId)) {
      const postWhere = postId
        ? { id: postId, ...this.authorization.postWhere(userId) }
        : { courseId: courseId!, course: { is: { userId } } };
      const where: Prisma.DiscussionWhereInput = { post: { is: postWhere } };
      const [comments, total] = await Promise.all([
        this.prisma.discussion.findMany({
          where,
          take: 100,
          orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
          select: {
            id: true,
            discussion: true,
            userId: true,
            parentId: true,
            createdAt: true,
            post: { select: { id: true, title: true } },
          },
        }),
        this.prisma.discussion.count({ where }),
      ]);
      const authors = new Map<string, string>();
      for (const c of comments) {
        if (!authors.has(c.userId))
          authors.set(c.userId, `Participant ${authors.size + 1}`);
        add(
          'COMMUNITY',
          c.post.title ?? 'Post discussion',
          {
            participant: authors.get(c.userId),
            text: this.communityText(c.discussion),
            thread: c.parentId ?? c.id,
            instructorAuthored: c.userId === userId,
          },
          {
            type: 'POST',
            id: c.post.id,
            label: c.post.title ?? 'Post discussion',
          },
          InstructorEvidenceKind.DISCUSSION,
        );
      }
      add(
        'COMMUNITY',
        'Discussion sample statistics',
        {
          totalComments: total,
          sampledComments: comments.length,
          sampledParticipants: authors.size,
        },
        undefined,
        InstructorEvidenceKind.STATISTICS,
      );
      if (total > comments.length)
        warnings.push(
          'Discussion themes describe the most recent 100 comments, not the entire community.',
        );
      if (courseId) {
        const reviewWhere = { courseId, course: { is: { userId } } };
        const [distribution, reviews, reviewCount] = await Promise.all([
          this.prisma.subscribe.groupBy({
            by: ['rating'],
            where: { ...reviewWhere, rating: { gt: 0 } },
            _count: { _all: true },
          }),
          this.prisma.subscribe.findMany({
            where: { ...reviewWhere, review: { not: null } },
            take: 100,
            orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
            select: { review: true, rating: true },
          }),
          this.prisma.subscribe.count({
            where: { ...reviewWhere, review: { not: null } },
          }),
        ]);
        add(
          'COMMUNITY',
          'Course ratings and anonymous review sample',
          {
            distribution,
            totalWrittenReviews: reviewCount,
            sampledReviews: reviews.map((r) => ({
              rating: r.rating,
              text: this.communityText(r.review),
            })),
          },
          {
            type: 'COURSE',
            id: courseId,
            label: course?.title ?? 'Course feedback',
          },
          InstructorEvidenceKind.FEEDBACK,
        );
        if (reviewCount > reviews.length)
          warnings.push('Written review themes are based on a bounded sample.');
      }
    }
    return evidence;
  }

  async resolveProposalSkills(proposal: InstructorProposal) {
    const taxonomy = await this.prisma.skill.findMany({
      select: { id: true, name: true, aliases: { select: { alias: true } } },
    });
    const normalize = (v: string) =>
      v.toLowerCase().replace(/[^\p{L}\p{N}+#]/gu, '');
    return proposal.items.map((item) => {
      const matches = taxonomy.filter((s) =>
        [s.name, ...s.aliases.map((a) => a.alias)].some(
          (n) => normalize(n) === normalize(item.title),
        ),
      );
      const match = matches.length === 1 ? matches[0] : null;
      return {
        suggestedName: item.title,
        skillId: match?.id ?? null,
        canonicalName: match?.name ?? null,
      };
    });
  }

  applyProposal(userId: string, messageId: string, edited: InstructorProposal) {
    return this.proposals.applyProposal(userId, messageId, edited);
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
  private safePost(
    post: NonNullable<Awaited<ReturnType<typeof this.loadPost>>>,
    userId: string,
    fullText = true,
  ) {
    const text = this.documentText(post.content);
    const limit = fullText ? 12000 : 2000;
    return {
      ...post,
      content: text.slice(0, limit),
      contentTruncated: text.length > limit,
      files: post.files
        .filter((f) => f.file.userId === userId)
        .map((f) => ({
          id: f.file.id,
          name: f.file.name,
          summary: f.file.summary,
          aiStatus: f.file.aiStatus,
        })),
    };
  }
  private documentText(value: unknown): string {
    if (typeof value === 'string') return value;
    if (Array.isArray(value))
      return value.map((v) => this.documentText(v)).join('\n');
    if (!value || typeof value !== 'object') return '';
    const v = value as { text?: string; content?: unknown };
    return v.text ?? this.documentText(v.content);
  }
  private communityText(value: unknown) {
    return this.documentText(value)
      .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, '[email removed]')
      .slice(0, 3000);
  }
  private async sourceLabel(
    userId: string,
    type: ContentChunkSourceType,
    id: string,
  ) {
    if (type === ContentChunkSourceType.POST)
      return (
        (
          await this.prisma.post.findFirst({
            where: { id, ...this.authorization.postWhere(userId) },
            select: { title: true },
          })
        )?.title ?? 'Post'
      );
    return (
      (
        await this.prisma.file.findFirst({
          where: { id, userId },
          select: { name: true },
        })
      )?.name ?? 'File'
    );
  }
  private resourceUrl(type: string, id: string) {
    if (type === 'COURSE') return `/course/${id}`;
    if (type === 'POST') return `/post/${id}`;
    return undefined;
  }
}
