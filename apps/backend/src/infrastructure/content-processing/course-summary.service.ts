import { createHash } from 'crypto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Difficulty } from '../../../generated/prisma/enums';
import { AiTextModelPurpose } from '../../application/ports/learning-assistant-response.port';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
    requiredEmbeddingDimensions,
} from '../ai/ai-model-config';
import { OpenAiClientService } from '../ai/openai-client.service';
import {
    COURSE_PROFILE_FORMAT,
    COURSE_PROFILE_INSTRUCTIONS,
} from '../ai/prompts/course-summary.prompts';

const COURSE_PROFILE_MAX_OUTPUT_TOKENS = 4_000;

export type CourseSummaryPostSkill = {
    id: number;
    name: string;
    description: string | null;
    outcome: string;
    importance: number;
    confidence: number | null;
};

export type CourseSummaryPost = {
    id: string;
    title: string;
    summary: string;
    skills: CourseSummaryPostSkill[];
};

export type CourseSummaryInput = {
    title: string;
    description: string;
    posts: CourseSummaryPost[];
};

export type GeneratedCourseSkill = {
    skillId: number;
    outcome: string;
    importance: number;
};

export type GeneratedCourseProfile = {
    summary: string;
    difficulty: Difficulty;
    profileText: string;
    skills: GeneratedCourseSkill[];
    embedding: number[];
    embeddingModel: string;
    sourceHash: string;
};

@Injectable()
export class CourseSummaryService {
    constructor(private readonly openAiClient: OpenAiClientService) {}

    async generate(input: CourseSummaryInput): Promise<GeneratedCourseProfile> {
        const normalized = this.normalizeInput(input);
        if (
            !normalized.title &&
            !normalized.description &&
            normalized.posts.length === 0
        ) {
            throw new InternalServerErrorException(
                'Course profile cannot be generated from empty content',
            );
        }

        const response = await this.openAiClient.createTextResponse({
            modelPurpose: AiTextModelPurpose.PROCESSING,
            instructions: COURSE_PROFILE_INSTRUCTIONS,
            input: [
                '<course_material>',
                JSON.stringify(normalized),
                '</course_material>',
            ].join('\n'),
            textFormat: COURSE_PROFILE_FORMAT,
            maxOutputTokens: COURSE_PROFILE_MAX_OUTPUT_TOKENS,
            failureLabel: 'Course profile generation',
        });
        const profile = this.parseResponse(response, normalized);
        const embeddingModel = requiredAiModel(
            AiModelEnvironmentVariable.TEXT_EMBEDDING,
        );
        const embeddingDimensions = requiredEmbeddingDimensions();
        const embeddings = await this.openAiClient.createEmbeddings([
            profile.profileText,
        ]);
        const embedding = embeddings?.[0];
        if (
            !embedding ||
            embedding.length !== embeddingDimensions ||
            embedding.some((value) => !Number.isFinite(value))
        ) {
            throw new InternalServerErrorException(
                `Embedding model ${embeddingModel} returned an invalid course profile vector`,
            );
        }

        return {
            ...profile,
            embedding,
            embeddingModel,
            sourceHash: createHash('sha256')
                .update(JSON.stringify(normalized))
                .digest('hex'),
        };
    }

    private parseResponse(
        response: string,
        input: CourseSummaryInput,
    ): Omit<
        GeneratedCourseProfile,
        'embedding' | 'embeddingModel' | 'sourceHash'
    > {
        let value: unknown;
        try {
            value = JSON.parse(response);
        } catch {
            throw new InternalServerErrorException(
                'Course profile generation returned invalid JSON',
            );
        }
        if (!value || typeof value !== 'object') {
            throw new InternalServerErrorException(
                'Course profile generation returned an invalid profile',
            );
        }

        const record = value as Record<string, unknown>;
        const summary = this.documentText(record.summary);
        const profileText = this.inlineText(record.profileText);
        const difficulty = record.difficulty;
        if (
            !summary ||
            !profileText ||
            !Object.values(Difficulty).includes(difficulty as Difficulty) ||
            !Array.isArray(record.skills)
        ) {
            throw new InternalServerErrorException(
                'Course profile generation returned an invalid profile',
            );
        }

        const allowedSkillIds = new Set(
            input.posts.flatMap((post) => post.skills.map((skill) => skill.id)),
        );
        const skills = record.skills.map((skill) =>
            this.parseSkill(skill, allowedSkillIds),
        );
        const returnedSkillIds = new Set(skills.map((skill) => skill.skillId));
        if (
            returnedSkillIds.size !== skills.length ||
            returnedSkillIds.size !== allowedSkillIds.size ||
            [...allowedSkillIds].some((id) => !returnedSkillIds.has(id))
        ) {
            throw new InternalServerErrorException(
                'Course profile generation did not return every candidate skill exactly once',
            );
        }

        return {
            summary,
            difficulty: difficulty as Difficulty,
            profileText,
            skills,
        };
    }

    private parseSkill(
        value: unknown,
        allowedSkillIds: Set<number>,
    ): GeneratedCourseSkill {
        if (!value || typeof value !== 'object') {
            throw new InternalServerErrorException(
                'Course profile generation returned an invalid skill',
            );
        }
        const record = value as Record<string, unknown>;
        const skillId = record.skillId;
        const outcome = this.inlineText(record.outcome);
        const importance = record.importance;
        if (
            !Number.isInteger(skillId) ||
            !allowedSkillIds.has(skillId as number) ||
            !outcome ||
            typeof importance !== 'number' ||
            !Number.isFinite(importance)
        ) {
            throw new InternalServerErrorException(
                'Course profile generation returned an invalid skill',
            );
        }
        return {
            skillId: skillId as number,
            outcome,
            importance: Math.max(0, Math.min(1, importance)),
        };
    }

    private normalizeInput(input: CourseSummaryInput): CourseSummaryInput {
        return {
            title: this.inlineText(input.title),
            description: this.documentText(input.description),
            posts: input.posts.map((post) => ({
                id: post.id,
                title: this.inlineText(post.title),
                summary: this.documentText(post.summary),
                skills: post.skills.map((skill) => ({
                    id: skill.id,
                    name: this.inlineText(skill.name),
                    description: this.inlineText(skill.description) || null,
                    outcome: this.inlineText(skill.outcome),
                    importance: this.score(skill.importance),
                    confidence:
                        skill.confidence === null
                            ? null
                            : this.score(skill.confidence),
                })),
            })),
        };
    }

    private score(value: number): number {
        return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
    }

    private inlineText(value: unknown): string {
        return typeof value === 'string'
            ? value.replace(/\s+/g, ' ').trim()
            : '';
    }

    private documentText(value: unknown): string {
        return typeof value === 'string'
            ? value
                  .replace(/^\uFEFF/, '')
                  .replace(/\r\n?/g, '\n')
                  .replace(/[\t ]+/g, ' ')
                  .replace(/ *\n */g, '\n')
                  .replace(/\n{3,}/g, '\n\n')
                  .trim()
            : '';
    }
}
