import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { OpenAiClientService } from '../ai/openai-client.service';
import {
    SKILL_EQUIVALENCE_FORMAT,
    SKILL_EQUIVALENCE_INSTRUCTIONS,
} from '../ai/prompts/skill-resolution.prompts';

type SkillInput = {
    name: string;
    description: string;
};

type TaxonomySkill = {
    id: number;
    name: string;
    aliases: Array<{ alias: string }>;
};

@Injectable()
export class SkillResolverService {
    constructor(private readonly openAiClient: OpenAiClientService) {}

    async resolve(
        transaction: Prisma.TransactionClient,
        generated: SkillInput,
    ): Promise<{ id: number }> {
        const name = this.inlineText(generated.name);
        if (!name) {
            throw new InternalServerErrorException(
                'Generated skill name cannot be empty',
            );
        }

        const exact = await transaction.skill.findFirst({
            where: {
                OR: [
                    { name: { equals: name, mode: 'insensitive' } },
                    {
                        aliases: {
                            some: {
                                alias: {
                                    equals: name,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                ],
            },
            select: { id: true },
        });
        if (exact) return exact;

        const taxonomy = await transaction.skill.findMany({
            select: {
                id: true,
                name: true,
                aliases: { select: { alias: true } },
            },
            orderBy: { name: 'asc' },
        });
        const normalizedMatches = this.normalizedMatches(name, taxonomy);
        if (normalizedMatches.length === 1) {
            return this.addAlias(transaction, normalizedMatches[0].id, name);
        }

        const matchedSkillId = await this.findSemanticMatch(
            name,
            generated.description,
            taxonomy,
        );
        if (matchedSkillId !== null) {
            return this.addAlias(transaction, matchedSkillId, name);
        }

        return transaction.skill.upsert({
            where: { name },
            update: {},
            create: {
                name,
                description: this.inlineText(generated.description) || null,
            },
            select: { id: true },
        });
    }

    private normalizedMatches(
        proposedName: string,
        taxonomy: TaxonomySkill[],
    ): TaxonomySkill[] {
        const key = this.comparisonKey(proposedName);
        if (!key) return [];

        return taxonomy.filter((skill) =>
            [skill.name, ...skill.aliases.map(({ alias }) => alias)].some(
                (candidate) => this.comparisonKey(candidate) === key,
            ),
        );
    }

    private async findSemanticMatch(
        name: string,
        description: string,
        taxonomy: TaxonomySkill[],
    ): Promise<number | null> {
        if (taxonomy.length === 0) return null;

        const response = await this.openAiClient.createTextResponse({
            instructions: SKILL_EQUIVALENCE_INSTRUCTIONS,
            input: [
                '<skill_resolution_input>',
                JSON.stringify({
                    proposedSkill: {
                        name,
                        description: this.inlineText(description),
                    },
                    candidates: taxonomy.map((skill) => ({
                        id: skill.id,
                        name: skill.name,
                    })),
                }),
                '</skill_resolution_input>',
            ].join('\n'),
            textFormat: SKILL_EQUIVALENCE_FORMAT,
            maxOutputTokens: 100,
            failureLabel: 'Skill equivalence resolution',
        });

        let result: unknown;
        try {
            result = JSON.parse(response);
        } catch {
            throw new InternalServerErrorException(
                'Skill equivalence resolution returned invalid JSON',
            );
        }
        const matchedSkillId =
            result && typeof result === 'object'
                ? (result as Record<string, unknown>).matchedSkillId
                : undefined;
        if (!Number.isInteger(matchedSkillId)) {
            throw new InternalServerErrorException(
                'Skill equivalence resolution returned an invalid skill ID',
            );
        }
        if (matchedSkillId === 0) return null;
        if (!taxonomy.some((skill) => skill.id === matchedSkillId)) {
            throw new InternalServerErrorException(
                'Skill equivalence resolution returned an unknown skill ID',
            );
        }
        return matchedSkillId as number;
    }

    private async addAlias(
        transaction: Prisma.TransactionClient,
        skillId: number,
        alias: string,
    ): Promise<{ id: number }> {
        const record = await transaction.skillAlias.upsert({
            where: { alias },
            update: {},
            create: { skillId, alias },
            select: { skillId: true },
        });
        return { id: record.skillId };
    }

    private comparisonKey(value: string): string {
        return value
            .normalize('NFKD')
            .toLocaleLowerCase('en-US')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9+#]+/g, '');
    }

    private inlineText(value: unknown): string {
        return typeof value === 'string'
            ? value.replace(/\s+/g, ' ').trim()
            : '';
    }
}
