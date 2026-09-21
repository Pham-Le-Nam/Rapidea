import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { GeneratedPostSkill } from './post-summary.service';
import { SkillResolverService } from './skill-resolver.service';

@Injectable()
export class PostSkillService {
    constructor(private readonly skillResolver: SkillResolverService) {}

    async replace(
        transaction: Prisma.TransactionClient,
        postId: string,
        generatedSkills: GeneratedPostSkill[],
    ): Promise<void> {
        await transaction.postSkill.deleteMany({ where: { postId } });

        const skillsById = new Map<number, GeneratedPostSkill>();
        for (const generated of generatedSkills) {
            const skill = await this.skillResolver.resolve(
                transaction,
                generated,
            );
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
