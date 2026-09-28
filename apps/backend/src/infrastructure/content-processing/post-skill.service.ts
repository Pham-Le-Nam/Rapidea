import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';
import { GeneratedPostSkill } from './post-summary.service';
import { SkillResolverService } from './skill-resolver.service';

export type ResolvedPostSkill = GeneratedPostSkill & {
    skillId: number;
};

@Injectable()
export class PostSkillService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly skillResolver: SkillResolverService,
    ) {}

    async resolve(
        generatedSkills: GeneratedPostSkill[],
    ): Promise<ResolvedPostSkill[]> {
        const skillsById = new Map<number, ResolvedPostSkill>();
        for (const generated of generatedSkills) {
            const skill = await this.skillResolver.resolve(
                this.prisma,
                generated,
            );
            const resolved = { ...generated, skillId: skill.id };
            const current = skillsById.get(skill.id);
            if (
                !current ||
                generated.importance * generated.confidence >
                    current.importance * current.confidence
            ) {
                skillsById.set(skill.id, resolved);
            }
        }

        return [...skillsById.values()];
    }

    async replace(
        transaction: Prisma.TransactionClient,
        postId: string,
        resolvedSkills: ResolvedPostSkill[],
    ): Promise<void> {
        await transaction.postSkill.deleteMany({ where: { postId } });

        if (resolvedSkills.length > 0) {
            await transaction.postSkill.createMany({
                data: resolvedSkills.map(({ skillId, ...generated }) => ({
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
