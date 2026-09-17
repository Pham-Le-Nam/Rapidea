import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OpenAiClientService } from '../ai/openai-client.service';
import {
    POST_PROFILE_FORMAT,
    POST_PROFILE_INSTRUCTIONS,
} from '../ai/prompts/post-summary.prompts';

const POST_PROFILE_MAX_OUTPUT_TOKENS = 3_000;

export type PostSummaryFile = {
    id: string;
    name: string;
    mimeType: string;
    summary: string;
};

export type PostSummaryInput = {
    title: string;
    description: string;
    files: PostSummaryFile[];
};

export type GeneratedPostSkill = {
    name: string;
    description: string;
    outcome: string;
    importance: number;
    confidence: number;
};

export type GeneratedPostProfile = {
    summary: string;
    skills: GeneratedPostSkill[];
};

@Injectable()
export class PostSummaryService {
    constructor(private readonly openAiClient: OpenAiClientService) {}

    async generate(input: PostSummaryInput): Promise<GeneratedPostProfile> {
        if (
            !this.normalizeInlineText(input.title) &&
            !this.normalizeDocumentText(input.description) &&
            input.files.length === 0
        ) {
            throw new InternalServerErrorException(
                'Post profile cannot be generated from empty content',
            );
        }

        const response = await this.openAiClient.createTextResponse({
            instructions: POST_PROFILE_INSTRUCTIONS,
            input: [
                '<post_material>',
                JSON.stringify({
                    title: this.normalizeInlineText(input.title),
                    description: this.normalizeDocumentText(input.description),
                    files: input.files.map((file) => ({
                        id: file.id,
                        name: file.name,
                        mimeType: file.mimeType,
                        summary: this.normalizeDocumentText(file.summary),
                    })),
                }),
                '</post_material>',
            ].join('\n'),
            textFormat: POST_PROFILE_FORMAT,
            maxOutputTokens: POST_PROFILE_MAX_OUTPUT_TOKENS,
            failureLabel: 'Post profile generation',
        });

        return this.parseResponse(response);
    }

    private parseResponse(response: string): GeneratedPostProfile {
        let value: unknown;
        try {
            value = JSON.parse(response);
        } catch {
            throw new InternalServerErrorException(
                'Post profile generation returned invalid JSON',
            );
        }

        if (!value || typeof value !== 'object') {
            throw new InternalServerErrorException(
                'Post profile generation returned an invalid profile',
            );
        }

        const record = value as Record<string, unknown>;
        const summary = this.normalizeDocumentText(record.summary);
        if (!summary || !Array.isArray(record.skills)) {
            throw new InternalServerErrorException(
                'Post profile generation returned an invalid profile',
            );
        }

        const skills = record.skills.map((skill) => this.parseSkill(skill));
        return {
            summary,
            skills: this.deduplicateSkills(skills),
        };
    }

    private parseSkill(value: unknown): GeneratedPostSkill {
        if (!value || typeof value !== 'object') {
            throw new InternalServerErrorException(
                'Post profile generation returned an invalid skill',
            );
        }

        const skill = value as Record<string, unknown>;
        const name = this.normalizeInlineText(skill.name);
        const description = this.normalizeInlineText(skill.description);
        const outcome = this.normalizeInlineText(skill.outcome);
        const importance = this.score(skill.importance, 'importance');
        const confidence = this.score(skill.confidence, 'confidence');

        if (!name || !description || !outcome) {
            throw new InternalServerErrorException(
                'Post profile generation returned an invalid skill',
            );
        }

        return { name, description, outcome, importance, confidence };
    }

    private deduplicateSkills(
        skills: GeneratedPostSkill[],
    ): GeneratedPostSkill[] {
        const result = new Map<string, GeneratedPostSkill>();
        for (const skill of skills) {
            const key = skill.name.toLocaleLowerCase('en-US');
            const existing = result.get(key);
            if (!existing || skill.confidence > existing.confidence) {
                result.set(key, skill);
            }
        }
        return [...result.values()];
    }

    private score(value: unknown, name: string): number {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            throw new InternalServerErrorException(
                `Post profile generation returned invalid ${name}`,
            );
        }
        return Math.max(0, Math.min(1, value));
    }

    private normalizeInlineText(value: unknown): string {
        return typeof value === 'string'
            ? value.replace(/\s+/g, ' ').trim()
            : '';
    }

    private normalizeDocumentText(value: unknown): string {
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
