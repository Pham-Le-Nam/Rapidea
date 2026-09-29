import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { PostRepository } from "../../domain/post/repositories/post.repository";
import { TagsService } from "../tags/tags.service";
import { NotificationService } from "../notification/notification.service";
import { buildPostGenerationPrompt } from "./post-generation.prompt";
import { AI_SERVICE, AiService } from "../ports/ai.service";

type PostGenerationInput = {
    title?: string;
    details?: string;
    tags?: string[];
    fileIds?: string[];
    courseId?: string;
};

type TiptapDetailsDocument = {
    type: 'doc';
    content: Array<{
        type: 'paragraph';
        content: Array<{ type: 'text'; text: string }>;
    }>;
};

const MIN_GENERATED_DETAILS_LENGTH = 80;

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY')
        private readonly postRepo: PostRepository,
        private readonly tagsService: TagsService,
        private readonly notificationService: NotificationService,
        @Inject(AI_SERVICE) private readonly aiService: AiService,
    ) {}

    async generatePostField(
        userId: string,
        target: 'title' | 'details',
        input: PostGenerationInput,
    ) {
        const { user, files, course } = await this.postRepo.findGenerationContext(
            userId,
            input.fileIds ?? [],
            input.courseId,
        );
        const materials = files.map((file) => ({
            name: file.name,
            mimeType: file.mimeType,
            summary: file.summary?.slice(0, 6_000) ?? '',
            extractedText: file.transcript?.text?.slice(0, 20_000) ?? '',
            tags: file.tags.map((entry) => entry.tag.name),
            aiStatus: file.aiStatus,
            moderationStatus: file.moderationStatus,
        }));
        const generationContext = {
            existingTitle: target === 'title' ? undefined : input.title,
            existingDetails: target === 'details' ? undefined : input.details,
            courseTitle: course?.title,
            tags: input.tags ?? [],
            materials,
        };
        const value = await this.aiService.generatePostContent({
            target,
            systemPrompt: buildPostGenerationPrompt(target, user?.creatorPrompt),
            context: JSON.stringify(generationContext),
        });

        if (target === 'details') {
            const document = this.parseDetailsDocument(value);
            if (this.hasUsefulDetails(document, input.title)) {
                return { target, value: document };
            }

            const correctedValue = await this.aiService.generatePostContent({
                target,
                systemPrompt: buildPostGenerationPrompt(
                    target,
                    user?.creatorPrompt,
                    true,
                ),
                context: JSON.stringify(generationContext),
            });
            const correctedDocument = this.parseDetailsDocument(correctedValue);
            if (!this.hasUsefulDetails(correctedDocument, input.title)) {
                throw new InternalServerErrorException(
                    'AI could not generate sufficiently detailed post content. Add more context or wait for attached files to finish processing.',
                );
            }
            return { target, value: correctedDocument };
        }
        return { target, value: value.replace(/^["']|["']$/g, '') };
    }

    private parseDetailsDocument(value: string): TiptapDetailsDocument | null {
        let parsed: unknown;
        try {
            parsed = JSON.parse(value);
        } catch {
            return null;
        }
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            return null;
        }
        const document = parsed as Partial<TiptapDetailsDocument>;
        if (
            document.type !== 'doc' ||
            !Array.isArray(document.content) ||
            document.content.length === 0 ||
            document.content.some(
                (paragraph) =>
                    paragraph?.type !== 'paragraph' ||
                    !Array.isArray(paragraph.content) ||
                    paragraph.content.length === 0 ||
                    paragraph.content.some(
                        (text) =>
                            text?.type !== 'text' ||
                            typeof text.text !== 'string' ||
                            !text.text.trim(),
                    ),
            )
        ) {
            return null;
        }
        return document as TiptapDetailsDocument;
    }

    private hasUsefulDetails(
        document: TiptapDetailsDocument | null,
        title?: string,
    ): document is TiptapDetailsDocument {
        if (!document) return false;
        const details = document.content
            .flatMap((paragraph) => paragraph.content)
            .map((text) => text.text.trim())
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        if (details.length < MIN_GENERATED_DETAILS_LENGTH) return false;
        return this.normalizedText(details) !== this.normalizedText(title ?? '');
    }

    private normalizedText(value: string): string {
        return value
            .normalize('NFKC')
            .toLocaleLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, ' ')
            .trim();
    }

    async createPost(userId: string, title?: string, content?: any, courseId?: string, isPreview?: boolean, tags: string[] = []) {
        const post = await this.postRepo.create(userId, title, content, courseId, isPreview);
        await this.tagsService.setPostTags(post.id, tags);
        await this.notificationService.notifyFollowersAndSubscribersOfNewPost(userId, post.id, post.title);

        return this.postRepo.findById(post.id);
    }

    async deletePostById(id: string, userId: string) {
        return this.postRepo.deleteById(id, userId);
    }

    async updatePostById(id: string, userId: string, title?: string, content?: any, isPreview?: boolean, courseId?: string | null, tags?: string[]) {
        const post = await this.postRepo.updateById(id, userId, title, content, isPreview, courseId);
        if (tags) {
            await this.tagsService.setPostTags(id, tags);
        }

        return this.postRepo.findById(post.id);
    }

    async recordPostView(id: string, userId: string) {
        return this.postRepo.recordView(id, userId);
    }

    async canViewAllCoursePosts(courseId: string, viewerId?: string) {
        return this.postRepo.canViewAllCoursePosts(courseId, viewerId);
    }

    async getPostById(id: string) {
        return this.postRepo.findById(id);
    }

    async getPostsByCourseId(courseId: string, viewerId?: string, options?: {
        previewOnly?: boolean;
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
        offset?: number;
        limit?: number;
    }) {
        return this.postRepo.findByCourseId(courseId, viewerId, options);
    }

    async getPostsByUserId(userId: string, options?: {
        offset?: number;
        limit?: number;
        courseId?: string;
        nonCourseOnly?: boolean;
        previewMode?: 'all' | 'preview' | 'nonPreview';
        orderBy?: 'rating' | 'createdAt';
        order?: 'asc' | 'desc';
    }) {
        return this.postRepo.findByUserId(userId, options);
    }

    async getRecommendedFeed(viewerId?: string, options?: {
        offset?: number;
        limit?: number;
    }) {
        return this.postRepo.findRecommendedFeed(viewerId, options);
    }
}
