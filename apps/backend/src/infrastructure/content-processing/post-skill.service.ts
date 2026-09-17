import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { GeneratedPostSkill } from './post-summary.service';

@Injectable()
export class PostSkillService {
    async replace(
        transaction: Prisma.TransactionClient,
        postId: string,
        generatedSkills: GeneratedPostSkill[],
    ): Promise<void> {
        await transaction.postSkill.deleteMany({ where: { postId } });

        const skillsById = new Map<number, GeneratedPostSkill>();
        for (const generated of generatedSkills) {
            const name = generated.name.replace(/\s+/g, ' ').trim();
            const existing = await transaction.skill.findFirst({
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
            const skill =
                existing ??
                (await transaction.skill.upsert({
                    where: { name },
                    update: {},
                    create: {
                        name,
                        description: generated.description,
                    },
                    select: { id: true },
                }));
            const current = skillsById.get(skill.id);
            if (
                !current ||
                generated.importance * generated.confidence >
                    current.importance * current.confidence
            ) {
                skillsById.set(skill.id, generated);
            }
        }

        if (skillsById.size > 0) {
            await transaction.postSkill.createMany({
                data: [...skillsById].map(([skillId, generated]) => ({
                    postId,
                    skillId,
                    outcome: generated.outcome,
                    importance: generated.importance,
                    confidence: generated.confidence,
                })),
            });
        }
    }
}
